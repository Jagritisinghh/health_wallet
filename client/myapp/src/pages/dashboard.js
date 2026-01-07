import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, FileText, Share2, LogOut, Upload, Plus, Heart, Calendar, X, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('General');
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get('/reports');
      setReports(res.data);
    } catch (err) { console.error("Error fetching reports"); }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first");
    setUploading(true);
    const formData = new FormData();
    formData.append('report', file);
    formData.append('category', category);

    try {
      await API.post('/reports/upload', formData);
      alert("Uploaded!");
      setIsModalOpen(false);
      fetchDashboardData();
    } catch (err) {
        console.log(err)
         alert("Upload failed"); } 
    finally { setUploading(false); }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      <aside className="w-72 bg-white border-r border-slate-200 p-8 hidden md:flex flex-col">
        <div className="flex items-center gap-3 text-blue-600 mb-12">
          <Activity size={28} className="bg-blue-600 text-white p-1 rounded-lg" />
          <h1 className="text-2xl font-bold">HealthWallet</h1>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-4 w-full p-4 bg-blue-50 text-blue-600 rounded-2xl font-bold">
            <Activity size={20} /> Dashboard
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-4 w-full p-4 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all">
            <Upload size={20} /> Reports
          </button>
        </nav>
        <button onClick={() => { 
    localStorage.clear(); 
    window.location.href = '/login'; 
  }} className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold mt-auto transition-all">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black">Overview</h2>
            <p className="text-slate-400">Welcome to your digital health wallet.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-[20px] shadow-lg shadow-blue-100 flex items-center gap-2 font-bold hover:scale-105 transition-all">
            <Plus size={20} /> New Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatCard icon={<Heart className="text-red-500" />} label="Heart Rate" val="72 bpm" color="bg-red-50" />
          <StatCard icon={<FileText className="text-blue-500" />} label="Total Reports" val={reports.length} color="bg-blue-50" />
          <StatCard icon={<Calendar className="text-orange-500" />} label="Last Checkup" val="Jan 05" color="bg-orange-50" />
        </div>

        {/* Chart and Reports Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-80">
            <h3 className="font-bold text-xl mb-4">Vital Statistics</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={[{t:'8am', r:70}, {t:'12pm', r:80}, {t:'4pm', r:75}, {t:'8pm', r:78}]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="t" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="r" stroke="#3b82f6" strokeWidth={4} dot={{r:6, fill:'#3b82f6', stroke:'#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col p-6">
            <h3 className="font-bold text-xl mb-6">Recent Reports</h3>
            <div className="space-y-4 overflow-y-auto flex-1">
              {reports.map(r => (
                <div key={r.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group">
                   <div className="flex items-center gap-3 font-bold text-sm"><FileText size={18} className="text-blue-500" /> {r.filename}</div>
                   <Share2 size={16} className="text-slate-300 group-hover:text-blue-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 transition-all"><X size={20}/></button>
            <h3 className="text-2xl font-black mb-6">Upload Report</h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="border-2 border-dashed border-slate-200 rounded-[32px] p-8 text-center hover:bg-blue-50 transition-all relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                <UploadCloud size={40} className="mx-auto text-blue-500 mb-2" />
                <p className="font-bold text-slate-700">{file ? file.name : "Select File"}</p>
              </div>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" value={category} onChange={e => setCategory(e.target.value)}>
                <option>General</option><option>Blood Test</option><option>X-Ray</option>
              </select>
              <button disabled={uploading} className="w-full bg-blue-600 text-white font-black py-5 rounded-[24px] shadow-lg shadow-blue-100 disabled:bg-slate-300 transition-all active:scale-95">
                {uploading ? "Saving..." : "Save to Wallet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({icon, label, val, color}) => (
  <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm">
    <div className={`p-3 w-fit rounded-2xl mb-4 ${color}`}>{icon}</div>
    <p className="text-slate-400 font-medium text-sm">{label}</p>
    <h3 className="text-3xl font-black">{val}</h3>
  </div>
);

export default Dashboard;