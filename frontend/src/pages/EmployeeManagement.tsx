import React, { useEffect, useState } from 'react';
import { Employee } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Users, UserPlus, Trash2, Mail, Phone, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';

const emptyForm = { name: '', email: '', phone: '', designation: '' };

export const EmployeeManagement: React.FC = () => {
  const { tr } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    api
      .getEmployees()
      .then(setEmployees)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setNotice('');
    setSaving(true);
    try {
      const created = await api.addEmployee(form);
      setEmployees((prev) => [created, ...prev]);
      setForm(emptyForm);
      setNotice(
        tr(
          `${created.name} can now sign in with ${created.email} and will see the Register Log.`,
          `${created.name} आता ${created.email} वापरून साइन इन करू शकतात आणि त्यांना रजिस्टर लॉग दिसेल.`
        )
      );
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (employee: Employee) => {
    if (!window.confirm(tr(`Remove ${employee.name}? They will no longer be able to sign in as an employee.`, `${employee.name} यांना काढायचे? ते यापुढे कर्मचारी म्हणून साइन इन करू शकणार नाहीत.`))) return;
    setNotice('');
    try {
      await api.deleteEmployee(employee.id);
      setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const inputClass =
    'w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]';

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#023b77] to-[#039583] text-white">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#023b77] tracking-tight">{tr('Employees', 'कर्मचारी')}</h1>
          <p className="text-xs text-slate-500">
            {tr('Create employee accounts. Employees sign in with their email and get access to the Register Log only.', 'कर्मचारी खाती तयार करा. कर्मचारी त्यांच्या ईमेलने साइन इन करतात आणि त्यांना फक्त रजिस्टर लॉगचा प्रवेश मिळतो.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add employee form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 text-xs h-fit">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[#039583]" />
            {tr('Add Employee', 'कर्मचारी जोडा')}
          </h2>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">{tr('Full Name', 'पूर्ण नाव')} *</label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input required value={form.name} onChange={update('name')} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">{tr('Email Address', 'ईमेल पत्ता')} *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input type="email" required value={form.email} onChange={update('email')} placeholder="name@palawi.org" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">{tr('Phone', 'फोन')}</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input type="tel" value={form.phone} onChange={update('phone')} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">{tr('Designation', 'पद')}</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input value={form.designation} onChange={update('designation')} placeholder={tr('e.g. Gate Supervisor', 'उदा. गेट पर्यवेक्षक')} className={inputClass} />
            </div>
          </div>

          {formError && (
            <p className="flex items-start gap-1.5 text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </p>
          )}
          {notice && (
            <p className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notice}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-95 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{saving ? tr('Adding…', 'जोडत आहे…') : tr('Create Employee', 'कर्मचारी तयार करा')}</span>
          </button>
        </form>

        {/* Employee list */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">{tr('Employee Accounts', 'कर्मचारी खाती')}</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#039583]/15 text-[#039583]">{employees.length}</span>
          </div>

          {loading ? (
            <p className="p-6 text-xs text-slate-500">{tr('Loading…', 'लोड होत आहे…')}</p>
          ) : loadError ? (
            <p className="p-6 text-xs text-red-700">{loadError}</p>
          ) : employees.length === 0 ? (
            <p className="p-6 text-xs text-slate-500">{tr('No employees yet. Add the first one using the form.', 'अजून कोणतेही कर्मचारी नाहीत. फॉर्म वापरून पहिला कर्मचारी जोडा.')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">{tr('Name', 'नाव')}</th>
                    <th className="py-3 px-4">{tr('Email', 'ईमेल')}</th>
                    <th className="py-3 px-4">{tr('Phone', 'फोन')}</th>
                    <th className="py-3 px-4">{tr('Designation', 'पद')}</th>
                    <th className="py-3 px-4">{tr('Added', 'जोडले')}</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-semibold text-slate-900">{emp.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{emp.email}</td>
                      <td className="py-3 px-4 text-slate-600">{emp.phone || '—'}</td>
                      <td className="py-3 px-4 text-slate-600">{emp.designation || '—'}</td>
                      <td className="py-3 px-4 text-slate-500">{new Date(emp.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(emp)}
                          title={tr('Remove employee', 'कर्मचारी काढा')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
