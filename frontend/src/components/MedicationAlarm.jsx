import React, { useState, useEffect } from 'react';
import { Bell, Clock, Calendar, Plus, Trash2, Activity, AlertCircle, FileText, CheckCircle2, Pill } from 'lucide-react';

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
      
      await fetchMedications();
    } catch (err) {
      console.error(err);
      setError("Failed to delete medication reminder.");
    }
  };

  return (
    <div style={{ padding: '2rem 1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }} className="animate-fade-in">
      {/* Header section */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', marginBottom: '1.25rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <Pill size={36} />
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Prescription & Alarm Scheduler
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Maintain consistent adherence automatically. Configure time-based alarms, tailored dosage routines, and custom notes.
        </p>
      </div>

      {/* Mini Stats Summary Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Active Schedules</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>{medications.length}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--success)' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Adherence Target</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>100%</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #a855f7' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <Bell size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Next Notification</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {medications.length > 0 ? medications[0].time : 'None Set'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem' }}>
        
        {/* LEFT COLUMN: ADD MEDICATION FORM */}
        <div className="glass-panel" style={{ padding: '2.5rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={22} color="var(--success)"/> Configure Alarm
          </h3>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Medication Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }}>
                  <Pill size={18} />
                </div>
                <input 
                  type="text" name="medication_name" value={formData.medication_name} onChange={handleInputChange} required 
                  placeholder="e.g. Metformin / Amoxicillin" 
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '14px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Dosage</label>
                <input 
                  type="text" name="dosage" value={formData.dosage} onChange={handleInputChange} 
                  placeholder="e.g. 500mg" 
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Trigger Time</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', left: '0.8rem', color: 'var(--text-muted)' }}>
                    <Clock size={16} />
                  </div>
                  <input 
                    type="time" name="time" value={formData.time} onChange={handleInputChange} required 
                    style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '14px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Repetition Cycle</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }}>
                  <Calendar size={18} />
                </div>
                <select 
                  name="frequency" value={formData.frequency} onChange={handleInputChange} 
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '14px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none', cursor: 'pointer', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                >
                  <option value="" style={{ color: 'var(--text-muted)' }}>Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Twice a Day">Twice a Day</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Clinical Instructions / Notes</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0.9rem', left: '1rem', color: 'var(--text-muted)' }}>
                  <FileText size={18} />
                </div>
                <textarea 
                  name="notes" value={formData.notes} onChange={handleInputChange} 
                  placeholder="e.g. Take after breakfast with a full glass of water." 
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '14px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none', minHeight: '90px', resize: 'vertical', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{ 
                marginTop: '0.5rem', 
                padding: '1rem', 
                borderRadius: '14px', 
                background: 'linear-gradient(135deg, var(--success), #059669)', 
                color: 'white', 
                fontWeight: '700', 
                fontSize: '1.05rem', 
                border: 'none', 
                cursor: 'pointer',
                boxShadow: '0 8px 20px -5px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Add Prescription Schedule
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: LIST OF MEDICATIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardListIcon size={22} color="var(--accent)"/> Scheduled Alerts
          </h3>
          
          {loading && medications.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <div className="spinner" style={{ display: 'inline-block', marginBottom: '1rem', border: '3px solid rgba(59, 130, 246, 0.2)', borderTopColor: 'var(--accent)', borderRadius: '50%', width: '32px', height: '32px' }} />
              <p style={{ fontWeight: '500' }}>Synchronizing your alarms...</p>
            </div>
          ) : medications.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>
                <Bell size={36} style={{ opacity: 0.4 }} />
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem' }}>No Timers Scheduled</p>
                <p style={{ fontSize: '0.95rem' }}>Add your primary medications on the left to activate digital reminder notifications.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '650px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {medications.map((med) => (
                <div 
                  key={med.id} 
                  className="glass-panel hover-lift" 
                  style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderLeft: '4px solid var(--success)',
                    background: 'var(--card-bg)'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>
                        {med.medication_name}
                      </h4>
                      {med.dosage && (
                        <span style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600', background: 'rgba(16, 185, 129, 0.1)', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>
                          {med.dosage}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '500' }}>
                        <Clock size={15} color="var(--success)"/> {med.time}
                      </span>
                      {med.frequency && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '500' }}>
                          <Calendar size={15} color="var(--accent)"/> {med.frequency}
                        </span>
                      )}
                    </div>

                    {med.notes && (
                      <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
                          "{med.notes}"
                        </p>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleDelete(med.id)} 
                    title="Delete Prescription Routine"
                    style={{ 
                      background: 'rgba(239, 68, 68, 0.08)', 
                      border: '1px solid rgba(239, 68, 68, 0.15)', 
                      padding: '0.75rem', 
                      borderRadius: '12px', 
                      color: 'var(--danger)', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }} 
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }} 
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
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
