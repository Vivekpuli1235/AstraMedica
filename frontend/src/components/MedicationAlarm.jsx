import React, { useState, useEffect } from 'react';
import { Bell, Clock, Calendar, Plus, Trash2, Activity, AlertCircle, FileText } from 'lucide-react';

const API_URL = "http://127.0.0.1:8000";

const MedicationAlarm = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    medication_name: '',
    dosage: '',
    time: '',
    frequency: '',
    notes: ''
  });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/medications`);
      if (!response.ok) throw new Error("Failed to fetch medications");
      const data = await response.json();
      setMedications(data);
    } catch (err) {
      console.error(err);
      setError("Could not load medications. Please assure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.medication_name || !formData.time) return;

    try {
      const response = await fetch(`${API_URL}/medications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error("Failed to save medication");
      
      // Refresh list and clear form
      await fetchMedications();
      setFormData({
        medication_name: '',
        dosage: '',
        time: '',
        frequency: '',
        notes: ''
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add medication reminder.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/medications/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete medication");
      
      // Refresh list
      await fetchMedications();
    } catch (err) {
      console.error(err);
      setError("Failed to delete medication reminder.");
    }
  };

  return (
    <div style={{ padding: '2rem 1.5rem', width: '100%', maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <Bell size={36} />
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '0.75rem', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
          Medication Alarms
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Never miss a dose. Manage your prescriptions automatically.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* ADD MEDICATION FORM */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} color="#10b981"/> Add Reminder
          </h3>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="input-group">
                <label className="input-label">Medication Name</label>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }}>
                        <Activity size={18} />
                    </div>
                    <input 
                        type="text" name="medication_name" value={formData.medication_name} onChange={handleInputChange} required 
                        className="text-input pl-10" placeholder="e.g. Lisinopril" 
                        style={{ paddingLeft: '3rem', width: '100%' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                    <label className="input-label">Dosage</label>
                    <input 
                        type="text" name="dosage" value={formData.dosage} onChange={handleInputChange} 
                        className="text-input" placeholder="e.g. 10mg" style={{ width: '100%' }}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Time</label>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }}>
                            <Clock size={16} />
                        </div>
                        <input 
                            type="time" name="time" value={formData.time} onChange={handleInputChange} required 
                            className="text-input" style={{ paddingLeft: '2.5rem', width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Frequency</label>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }}>
                        <Calendar size={18} />
                    </div>
                    <select 
                        name="frequency" value={formData.frequency} onChange={handleInputChange} 
                        className="text-input" style={{ paddingLeft: '3rem', width: '100%', appearance: 'none' }}
                    >
                        <option value="">Select Frequency</option>
                        <option value="Daily">Daily</option>
                        <option value="Twice a Day">Twice a Day</option>
                        <option value="Weekly">Weekly</option>
                        <option value="As Needed">As Needed</option>
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label className="input-label">Additional Notes</label>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--text-muted)' }}>
                        <FileText size={18} />
                    </div>
                    <textarea 
                        name="notes" value={formData.notes} onChange={handleInputChange} 
                        className="text-input" placeholder="e.g. Take with food" 
                        style={{ paddingLeft: '3rem', width: '100%', minHeight: '80px', paddingTop: '1rem' }}
                    />
                </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              Add Medication
            </button>
          </form>
        </div>

        {/* LIST OF MEDICATIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardListIcon size={20} color="#38bdf8"/> Your Reminders
          </h3>
          
          {loading && medications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <Activity className="spinner" size={24} style={{ margin: '0 auto 1rem auto' }} />
                <p>Loading your reminders...</p>
            </div>
          ) : medications.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Bell size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <p>No medication reminders set yet.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Add a new reminder on the left.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {medications.map((med) => (
                <div key={med.id} className="glass-panel hover-lift" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #10b981' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>
                        {med.medication_name} {med.dosage && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>({med.dosage})</span>}
                    </h4>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} color="#10b981"/> {med.time}</span>
                        {med.frequency && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} color="#38bdf8"/> {med.frequency}</span>}
                    </div>
                    {med.notes && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>Note: {med.notes}</p>}
                  </div>
                  <button onClick={() => handleDelete(med.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '12px', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick inline icon component to avoid adding new import
const ClipboardListIcon = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <path d="M12 11h4"></path>
        <path d="M12 16h4"></path>
        <path d="M8 11h.01"></path>
        <path d="M8 16h.01"></path>
    </svg>
);

export default MedicationAlarm;
