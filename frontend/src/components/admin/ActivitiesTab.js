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

export const ActivitiesTab = ({ data, onRefresh }) => {
  const [form, setForm] = useState({ title: '', description: '', date: '', images: [] });
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/activities/${editing.id}`, { ...form, id: editing.id });
      } else {
        await axios.post(`${API}/activities`, form);
      }
      toast.success(editing ? 'Updated' : 'Added');
      setForm({ title: '', description: '', date: '', images: [] });
      setEditing(null);
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        await axios.delete(`${API}/activities/${id}`);
        toast.success('Deleted');
        onRefresh();
      } catch (error) {
        toast.error('Failed');
      }
    }
  };

  const handleUpload = async (files) => {
    try {
      const urls = [];
      for (let file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post(`${API}/upload`, formData);
        urls.push(res.data.url);
      }
      setForm({...form, images: [...form.images, ...urls]});
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit' : 'Add'} Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Images</label>
            <Input type="file" accept="image/*" multiple onChange={(e) => e.target.files.length > 0 && handleUpload(Array.from(e.target.files))} />
          </div>
          <div className="flex space-x-2">
            <Button type="submit"><Save className="mr-2" size={18} />{editing ? 'Update' : 'Add'}</Button>
            {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ title: '', description: '', date: '', images: [] }); }}><X className="mr-2" size={18} />Cancel</Button>}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Existing Activities</h3>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
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