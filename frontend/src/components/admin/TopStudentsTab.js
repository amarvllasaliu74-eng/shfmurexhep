import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const TopStudentsTab = ({ data, onRefresh }) => {
  const [form, setForm] = useState({ subject: '', name: '', class_name: '', achievement: '' });
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/top-students/${editing.id}`, { ...form, id: editing.id });
      } else {
        await axios.post(`${API}/top-students`, form);
      }
      toast.success(editing ? 'Updated' : 'Added');
      setForm({ subject: '', name: '', class_name: '', achievement: '' });
      setEditing(null);
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        await axios.delete(`${API}/top-students/${id}`);
        toast.success('Deleted');
        onRefresh();
      } catch (error) {
        toast.error('Failed');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit' : 'Add'} Top Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Class</label>
              <Input value={form.class_name} onChange={(e) => setForm({...form, class_name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Achievement</label>
              <Input value={form.achievement} onChange={(e) => setForm({...form, achievement: e.target.value})} required />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button type="submit"><Save className="mr-2" size={18} />{editing ? 'Update' : 'Add'}</Button>
            {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ subject: '', name: '', class_name: '', achievement: '' }); }}><X className="mr-2" size={18} />Cancel</Button>}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Existing Top Students</h3>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name} - {item.class_name}</p>
                  <p className="text-sm text-gray-600">{item.subject}: {item.achievement}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditing(item); setForm(item); }}><Edit size={16} /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};