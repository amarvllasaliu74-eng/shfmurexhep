import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Edit, Trash2, X, Image } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const HeroSlidesTab = ({ data, onRefresh }) => {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    image_url: '', 
    slide_type: 'event',
    order: 0,
    active: true 
  });
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/hero-slides/${editing.id}`, { ...form, id: editing.id });
      } else {
        await axios.post(`${API}/hero-slides`, form);
      }
      toast.success(editing ? 'Updated' : 'Added');
      setForm({ title: '', description: '', image_url: '', slide_type: 'event', order: 0, active: true });
      setEditing(null);
      onRefresh();
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      try {
        await axios.delete(`${API}/hero-slides/${id}`);
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
      setForm({...form, image_url: res.data.url});
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit' : 'Add'} Hero Slide</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <select 
                className="w-full h-10 px-3 border rounded-md"
                value={form.slide_type} 
                onChange={(e) => setForm({...form, slide_type: e.target.value})}
              >
                <option value="event">Event</option>
                <option value="news">Lajme</option>
                <option value="announcement">Njoftim</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Image</label>
            <Input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])} />
            {form.image_url && (
              <img src={`${BACKEND_URL}${form.image_url}`} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Order</label>
              <Input type="number" value={form.order} onChange={(e) => setForm({...form, order: parseInt(e.target.value)})} />
            </div>
            <div className="flex items-center pt-8">
              <input 
                type="checkbox" 
                checked={form.active} 
                onChange={(e) => setForm({...form, active: e.target.checked})}
                className="mr-2"
              />
              <label className="text-sm font-semibold">Active</label>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button type="submit"><Save className="mr-2" size={18} />{editing ? 'Update' : 'Add'}</Button>
            {editing && (
              <Button type="button" variant="outline" onClick={() => { 
                setEditing(null); 
                setForm({ title: '', description: '', image_url: '', slide_type: 'event', order: 0, active: true }); 
              }}>
                <X className="mr-2" size={18} />Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Existing Slides</h3>
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {item.image_url && (
                    <img 
                      src={`${BACKEND_URL}${item.image_url}`} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.slide_type} - Order: {item.order}</p>
                    <span className={`text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-800' : 'bg-gray-200'}`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
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
