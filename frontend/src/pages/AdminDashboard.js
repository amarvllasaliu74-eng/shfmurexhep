import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit, Save, X, Upload, Star, Award, Calendar, Trophy, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student-of-month');
  
  // State for Student of Month
  const [studentsOfMonth, setStudentsOfMonth] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: ''
  });
  const [editingStudent, setEditingStudent] = useState(null);

  // State for Top Students
  const [topStudents, setTopStudents] = useState([]);
  const [topStudentForm, setTopStudentForm] = useState({
    subject: '', name: '', class_name: '', achievement: ''
  });
  const [editingTopStudent, setEditingTopStudent] = useState(null);

  // State for Activities
  const [activities, setActivities] = useState([]);
  const [activityForm, setActivityForm] = useState({
    title: '', description: '', date: '', images: []
  });
  const [editingActivity, setEditingActivity] = useState(null);

  // State for Tournaments
  const [tournaments, setTournaments] = useState([]);
  const [tournamentForm, setTournamentForm] = useState({
    name: '', sport_type: '', date: '', results: '', winners: '', images: []
  });
  const [editingTournament, setEditingTournament] = useState(null);

  // State for Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState('');

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [students, topStud, acts, tours, anncs] = await Promise.all([
        axios.get(`${API}/student-of-month`),
        axios.get(`${API}/top-students`),
        axios.get(`${API}/activities`),
        axios.get(`${API}/tournaments`),
        axios.get(`${API}/announcements`)
      ]);
      setStudentsOfMonth(students.data);
      setTopStudents(topStud.data);
      setActivities(acts.data);
      setTournaments(tours.data);
      setAnnouncements(anncs.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API}/upload`, formData);
      return response.data.url;
    } catch (error) {
      toast.error('Image upload failed');
      return null;
    }
  };

  // Student of Month Functions
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`${API}/student-of-month/${editingStudent.id}`, {
          ...studentForm,
          id: editingStudent.id
        });
        toast.success('Student updated successfully');
      } else {
        await axios.post(`${API}/student-of-month`, studentForm);
        toast.success('Student added successfully');
      }
      setStudentForm({ name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: '' });
      setEditingStudent(null);
      fetchAllData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API}/student-of-month/${id}`);
        toast.success('Student deleted');
        fetchAllData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  // Top Students Functions
  const handleTopStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTopStudent) {
        await axios.put(`${API}/top-students/${editingTopStudent.id}`, {
          ...topStudentForm,
          id: editingTopStudent.id
        });
        toast.success('Student updated successfully');
      } else {
        await axios.post(`${API}/top-students`, topStudentForm);
        toast.success('Student added successfully');
      }
      setTopStudentForm({ subject: '', name: '', class_name: '', achievement: '' });
      setEditingTopStudent(null);
      fetchAllData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteTopStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API}/top-students/${id}`);
        toast.success('Student deleted');
        fetchAllData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  // Activity Functions
  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        await axios.put(`${API}/activities/${editingActivity.id}`, {
          ...activityForm,
          id: editingActivity.id
        });
        toast.success('Activity updated successfully');
      } else {
        await axios.post(`${API}/activities`, activityForm);
        toast.success('Activity added successfully');
      }
      setActivityForm({ title: '', description: '', date: '', images: [] });
      setEditingActivity(null);
      fetchAllData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await axios.delete(`${API}/activities/${id}`);
        toast.success('Activity deleted');
        fetchAllData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  // Tournament Functions
  const handleTournamentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTournament) {
        await axios.put(`${API}/tournaments/${editingTournament.id}`, {
          ...tournamentForm,
          id: editingTournament.id
        });
        toast.success('Tournament updated successfully');
      } else {
        await axios.post(`${API}/tournaments`, tournamentForm);
        toast.success('Tournament added successfully');
      }
      setTournamentForm({ name: '', sport_type: '', date: '', results: '', winners: '', images: [] });
      setEditingTournament(null);
      fetchAllData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteTournament = async (id) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      try {
        await axios.delete(`${API}/tournaments/${id}`);
        toast.success('Tournament deleted');
        fetchAllData();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  // Announcement Functions
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/announcements`, { text: announcementText });
      toast.success('Announcement added');
      setAnnouncementText('');
      fetchAllData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`${API}/announcements/${id}`);
      toast.success('Announcement deleted');
      fetchAllData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Sh.F.M.U. "Rexhep Elmazi"</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/')} data-testid="view-website-btn">
                View Website
              </Button>
              <Button variant="destructive" onClick={handleLogout} data-testid="logout-btn">
                <LogOut className="mr-2" size={18} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-8" data-testid="admin-tabs">
            <TabsTrigger value="student-of-month" data-testid="tab-student-of-month">
              <Star className="mr-2" size={18} />
              Student of Month
            </TabsTrigger>
            <TabsTrigger value="top-students" data-testid="tab-top-students">
              <Award className="mr-2" size={18} />
              Top Students
            </TabsTrigger>
            <TabsTrigger value="activities" data-testid="tab-activities">
              <Calendar className="mr-2" size={18} />
              Activities
            </TabsTrigger>
            <TabsTrigger value="tournaments" data-testid="tab-tournaments">
              <Trophy className="mr-2" size={18} />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="announcements" data-testid="tab-announcements">
              <MessageSquare className="mr-2" size={18} />
              Announcements
            </TabsTrigger>
          </TabsList>

          {/* Student of Month Tab */}
          <TabsContent value="student-of-month">
            <Card>
              <CardHeader>
                <CardTitle>{editingStudent ? 'Edit' : 'Add'} Student of the Month</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <Input
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                        required
                        data-testid="student-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Class</label>
                      <Input
                        value={studentForm.class_name}
                        onChange={(e) => setStudentForm({...studentForm, class_name: e.target.value})}
                        required
                        data-testid="student-class-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Month</label>
                      <Input
                        value={studentForm.month}
                        onChange={(e) => setStudentForm({...studentForm, month: e.target.value})}
                        placeholder="e.g., Janar"
                        required
                        data-testid="student-month-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Year</label>
                      <Input
                        type="number"
                        value={studentForm.year}
                        onChange={(e) => setStudentForm({...studentForm, year: parseInt(e.target.value)})}
                        required
                        data-testid="student-year-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Reason</label>
                    <Textarea
                      value={studentForm.reason}
                      onChange={(e) => setStudentForm({...studentForm, reason: e.target.value})}
                      rows={3}
                      required
                      data-testid="student-reason-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Photo</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files[0]) {
                          const url = await handleImageUpload(e.target.files[0]);
                          if (url) setStudentForm({...studentForm, photo_url: url});
                        }
                      }}
                      data-testid="student-photo-input"
                    />
                    {studentForm.photo_url && (
                      <img src={`${BACKEND_URL}${studentForm.photo_url}`} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" data-testid="submit-student-btn">
                      <Save className="mr-2" size={18} />
                      {editingStudent ? 'Update' : 'Add'} Student
                    </Button>
                    {editingStudent && (
                      <Button type="button" variant="outline" onClick={() => {
                        setEditingStudent(null);
                        setStudentForm({ name: '', class_name: '', month: '', year: new Date().getFullYear(), reason: '', photo_url: '' });
                      }}>
                        <X className="mr-2" size={18} />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Existing Students</h3>
                  <div className="space-y-4">
                    {studentsOfMonth.map((student) => (
                      <div key={student.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center" data-testid={`student-item-${student.id}`}>
                        <div>
                          <p className="font-semibold">{student.name} - {student.class_name}</p>
                          <p className="text-sm text-gray-600">{student.month} {student.year}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingStudent(student);
                            setStudentForm(student);
                          }} data-testid={`edit-student-${student.id}`}>
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteStudent(student.id)} data-testid={`delete-student-${student.id}`}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Students Tab */}
          <TabsContent value="top-students">
            <Card>
              <CardHeader>
                <CardTitle>{editingTopStudent ? 'Edit' : 'Add'} Top Student</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTopStudentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Subject</label>
                      <Input
                        value={topStudentForm.subject}
                        onChange={(e) => setTopStudentForm({...topStudentForm, subject: e.target.value})}
                        placeholder="e.g., Matematikë"
                        required
                        data-testid="top-student-subject-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <Input
                        value={topStudentForm.name}
                        onChange={(e) => setTopStudentForm({...topStudentForm, name: e.target.value})}
                        required
                        data-testid="top-student-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Class</label>
                      <Input
                        value={topStudentForm.class_name}
                        onChange={(e) => setTopStudentForm({...topStudentForm, class_name: e.target.value})}
                        required
                        data-testid="top-student-class-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Achievement</label>
                      <Input
                        value={topStudentForm.achievement}
                        onChange={(e) => setTopStudentForm({...topStudentForm, achievement: e.target.value})}
                        required
                        data-testid="top-student-achievement-input"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" data-testid="submit-top-student-btn">
                      <Save className="mr-2" size={18} />
                      {editingTopStudent ? 'Update' : 'Add'} Student
                    </Button>
                    {editingTopStudent && (
                      <Button type="button" variant="outline" onClick={() => {
                        setEditingTopStudent(null);
                        setTopStudentForm({ subject: '', name: '', class_name: '', achievement: '' });
                      }}>
                        <X className="mr-2" size={18} />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Existing Top Students</h3>
                  <div className="space-y-4">
                    {topStudents.map((student) => (
                      <div key={student.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center" data-testid={`top-student-item-${student.id}`}>
                        <div>
                          <p className="font-semibold">{student.name} - {student.class_name}</p>
                          <p className="text-sm text-gray-600">{student.subject}: {student.achievement}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingTopStudent(student);
                            setTopStudentForm(student);
                          }} data-testid={`edit-top-student-${student.id}`}>
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteTopStudent(student.id)} data-testid={`delete-top-student-${student.id}`}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>{editingActivity ? 'Edit' : 'Add'} Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleActivitySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Title</label>
                      <Input
                        value={activityForm.title}
                        onChange={(e) => setActivityForm({...activityForm, title: e.target.value})}
                        required
                        data-testid="activity-title-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date</label>
                      <Input
                        type="date"
                        value={activityForm.date}
                        onChange={(e) => setActivityForm({...activityForm, date: e.target.value})}
                        required
                        data-testid="activity-date-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <Textarea
                      value={activityForm.description}
                      onChange={(e) => setActivityForm({...activityForm, description: e.target.value})}
                      rows={3}
                      required
                      data-testid="activity-description-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Images (multiple)</label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        if (e.target.files.length > 0) {
                          const urls = [];
                          for (let file of e.target.files) {
                            const url = await handleImageUpload(file);
                            if (url) urls.push(url);
                          }
                          setActivityForm({...activityForm, images: [...activityForm.images, ...urls]});
                        }
                      }}
                      data-testid="activity-images-input"
                    />
                    {activityForm.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {activityForm.images.map((img, idx) => (
                          <img key={idx} src={`${BACKEND_URL}${img}`} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded-lg" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" data-testid="submit-activity-btn">
                      <Save className="mr-2" size={18} />
                      {editingActivity ? 'Update' : 'Add'} Activity
                    </Button>
                    {editingActivity && (
                      <Button type="button" variant="outline" onClick={() => {
                        setEditingActivity(null);
                        setActivityForm({ title: '', description: '', date: '', images: [] });
                      }}>
                        <X className="mr-2" size={18} />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Existing Activities</h3>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center" data-testid={`activity-item-${activity.id}`}>
                        <div>
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingActivity(activity);
                            setActivityForm(activity);
                          }} data-testid={`edit-activity-${activity.id}`}>
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteActivity(activity.id)} data-testid={`delete-activity-${activity.id}`}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <Card>
              <CardHeader>
                <CardTitle>{editingTournament ? 'Edit' : 'Add'} Tournament</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTournamentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <Input
                        value={tournamentForm.name}
                        onChange={(e) => setTournamentForm({...tournamentForm, name: e.target.value})}
                        required
                        data-testid="tournament-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Sport Type</label>
                      <Input
                        value={tournamentForm.sport_type}
                        onChange={(e) => setTournamentForm({...tournamentForm, sport_type: e.target.value})}
                        required
                        data-testid="tournament-sport-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date</label>
                      <Input
                        type="date"
                        value={tournamentForm.date}
                        onChange={(e) => setTournamentForm({...tournamentForm, date: e.target.value})}
                        required
                        data-testid="tournament-date-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Results</label>
                    <Textarea
                      value={tournamentForm.results}
                      onChange={(e) => setTournamentForm({...tournamentForm, results: e.target.value})}
                      rows={2}
                      required
                      data-testid="tournament-results-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Winners</label>
                    <Textarea
                      value={tournamentForm.winners}
                      onChange={(e) => setTournamentForm({...tournamentForm, winners: e.target.value})}
                      rows={2}
                      required
                      data-testid="tournament-winners-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Images (multiple)</label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        if (e.target.files.length > 0) {
                          const urls = [];
                          for (let file of e.target.files) {
                            const url = await handleImageUpload(file);
                            if (url) urls.push(url);
                          }
                          setTournamentForm({...tournamentForm, images: [...tournamentForm.images, ...urls]});
                        }
                      }}
                      data-testid="tournament-images-input"
                    />
                    {tournamentForm.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tournamentForm.images.map((img, idx) => (
                          <img key={idx} src={`${BACKEND_URL}${img}`} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded-lg" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" data-testid="submit-tournament-btn">
                      <Save className="mr-2" size={18} />
                      {editingTournament ? 'Update' : 'Add'} Tournament
                    </Button>
                    {editingTournament && (
                      <Button type="button" variant="outline" onClick={() => {
                        setEditingTournament(null);
                        setTournamentForm({ name: '', sport_type: '', date: '', results: '', winners: '', images: [] });
                      }}>
                        <X className="mr-2" size={18} />
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Existing Tournaments</h3>
                  <div className="space-y-4">
                    {tournaments.map((tournament) => (
                      <div key={tournament.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center" data-testid={`tournament-item-${tournament.id}`}>
                        <div>
                          <p className="font-semibold">{tournament.name}</p>
                          <p className="text-sm text-gray-600">{tournament.sport_type} - {tournament.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingTournament(tournament);
                            setTournamentForm(tournament);
                          }} data-testid={`edit-tournament-${tournament.id}`}>
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteTournament(tournament.id)} data-testid={`delete-tournament-${tournament.id}`}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Manage Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Announcement Text (for Live TV)</label>
                    <Textarea
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      rows={2}
                      placeholder="Enter announcement text that will scroll on Live TV dashboard"
                      required
                      data-testid="announcement-text-input"
                    />
                  </div>
                  <Button type="submit" data-testid="submit-announcement-btn">
                    <Plus className="mr-2" size={18} />
                    Add Announcement
                  </Button>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Active Announcements</h3>
                  <div className="space-y-2">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center" data-testid={`announcement-item-${announcement.id}`}>
                        <p className="text-sm">{announcement.text}</p>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteAnnouncement(announcement.id)} data-testid={`delete-announcement-${announcement.id}`}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
