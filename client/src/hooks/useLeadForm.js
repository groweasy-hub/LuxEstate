'use client';
import { useState } from 'react';
import { leadsAPI } from '@/lib/api';

function normalizeOptions(sourceOrOptions, projectInterestedArg) {
  if (typeof sourceOrOptions === 'string' || sourceOrOptions === undefined) {
    return {
      source: sourceOrOptions || 'other',
      projectInterested: projectInterestedArg || '',
    };
  }

  return {
    source: sourceOrOptions.source || 'other',
    projectInterested: sourceOrOptions.projectInterested || '',
    projectId: sourceOrOptions.projectId || '',
    offerId: sourceOrOptions.offerId || '',
    offerTitle: sourceOrOptions.offerTitle || '',
    message: sourceOrOptions.message || '',
  };
}

export function useLeadForm(sourceOrOptions = 'other', projectInterestedArg = '') {
  const options = normalizeOptions(sourceOrOptions, projectInterestedArg);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: options.message || '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) nextErrors.phone = 'Enter valid 10-digit phone';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Invalid email';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      await leadsAPI.submit({
        ...form,
        source: options.source,
        projectInterested: options.projectInterested,
        projectId: options.projectId || undefined,
        offerId: options.offerId || undefined,
        offerTitle: options.offerTitle || undefined,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return { form, errors, status, handleChange, handleSubmit };
}
