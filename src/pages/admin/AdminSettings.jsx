import { useEffect, useState } from 'react';
import { Settings, Shield, KeyRound, CheckCircle2 } from 'lucide-react';
import { adminFetch } from '../../lib/api';
import { adminEmail, fetchAdminMe } from '../../lib/adminAuth';

export default function AdminSettings() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAdminMe().then(setProfile);
  }, []);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const save = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    const { res, data } = await adminFetch('/auth/password', {
      method: 'PATCH',
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }),
    });

    setSaving(false);
    if (!res.ok) {
      setError(data.error || 'Could not update password.');
      return;
    }

    setSuccess(data.message || 'Password updated successfully.');
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const email = profile?.email || adminEmail();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <div>
        <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">
          <Settings size={13} />
          Account
        </p>
        <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white md:text-4xl">Settings</h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/45">
          Manage your studio console login and security.
        </p>
      </div>

      <section className="mt-10 rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#C9A259]/25 bg-[#C9A259]/10 text-[#C9A259]">
            <Shield size={20} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-white">Signed in as</h2>
            <p className="mt-1 text-[14px] text-white/70">{email || '—'}</p>
            {profile?.name && <p className="mt-0.5 text-[12px] text-white/35">{profile.name}</p>}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg border border-[#C9A259]/25 bg-[#C9A259]/10 text-[#C9A259]">
            <KeyRound size={18} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-white">Change password</h2>
            <p className="text-[12px] text-white/40">Use at least 8 characters with letters and numbers.</p>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-[#C96A45]">{error}</p>}
        {success && (
          <p className="mb-4 flex items-center gap-2 text-sm text-[#C9A259]">
            <CheckCircle2 size={15} />
            {success}
          </p>
        )}

        <form onSubmit={save} className="space-y-4">
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Current password
            <input
              type="password"
              required
              value={form.currentPassword}
              onChange={set('currentPassword')}
              autoComplete="current-password"
              className={inputClass}
            />
          </label>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            New password
            <input
              type="password"
              required
              minLength={8}
              value={form.newPassword}
              onChange={set('newPassword')}
              autoComplete="new-password"
              className={inputClass}
            />
          </label>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Confirm new password
            <input
              type="password"
              required
              minLength={8}
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              autoComplete="new-password"
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-[#C9A259] px-6 py-3 text-[11px] font-bold tracking-[0.16em] text-[#14100A] uppercase transition-colors hover:bg-[#dfc070] disabled:opacity-60"
          >
            {saving ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>
    </main>
  );
}

const inputClass =
  'mt-1.5 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[14px] font-normal normal-case tracking-normal text-white outline-none focus:border-[#C9A259]/50';
