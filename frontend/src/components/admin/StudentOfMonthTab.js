import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const StudentOfMonthTab = ({ data, onRefresh }) => {
  const [form, setForm] = useState({
    name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: ''
  });
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/student-of-month/${editing.id}`, { ...form, id: editing.id });
        toast.success('Updated');
      } else {
        await axios.post(`${API}/student-of-month`, form);
        toast.success('Added');
      }
      setForm({ name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: '' });
      setEditing(null);
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        await axios.delete(`${API}/student-of-month/${id}`);
        toast.success('Deleted');
        onRefresh();
      } catch (error) {
        toast.error('Failed');
      }
    }
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${API}/upload`, formData);
      setForm({...form, photo_url: res.data.url});
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit' : 'Add'} Student of the Month</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Class</label>
              <Input value={form.class_name} onChange={(e) => setForm({...form, class_name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Month</label>
              <Input value={form.month} onChange={(e) => setForm({...form, month: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Year</label>
              <Input type="number" value={form.year} onChange={(e) => setForm({...form, year: parseInt(e.target.value)})} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Reason</label>
            <Textarea value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})} rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Photo</label>
            <Input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])} />
            {form.photo_url && (
              <img 
                src={form.photo_url.startsWith('http') ? form.photo_url : `${BACKEND_URL}${form.photo_url}`}
                alt="Preview" 
                className="mt-2 w-32 h-32 object-cover rounded-lg" 
              />
            )}
          </div>
          <div className="flex space-x-2">
            <Button type="submit"><Save className="mr-2" size={18} />{editing ? 'Update' : 'Add'}</Button>
            {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: '' }); }}><X className="mr-2" size={18} />Cancel</Button>}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Existing Students</h3>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name} - {item.class_name}</p>
                  <p className="text-sm text-gray-600">{item.month} {item.year}</p>
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