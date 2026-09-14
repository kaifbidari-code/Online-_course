import { useState } from 'react';
import { Award, Download, Share2, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';
import type { Certificate } from '../../types';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export function CertificatesPage() {
  const { certificates } = useApp();
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Earned Certificates</h1>
        <p className="text-sm text-text-secondary">View and verify your official LearnSphere certificates of completion.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <Award size={44} className="mx-auto text-text-muted" />
          <h3 className="text-lg font-bold text-text-primary">No certificates earned yet</h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Complete 100% of any course lessons and pass the final quiz to earn your verifiable certificate!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="card p-6 bg-white shadow-soft space-y-4 hover:shadow-elevated transition-shadow relative border border-surface-200">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white shadow-primary">
                  <Award size={24} />
                </div>
                <Badge variant="success">✓ Verified</Badge>
              </div>

              <div>
                <h3 className="font-bold text-base text-text-primary">{cert.courseName}</h3>
                <p className="text-xs text-text-muted mt-0.5">Instructor: {cert.instructorName}</p>
              </div>

              <div className="pt-2 border-t border-surface-100 flex justify-between items-center text-xs">
                <span className="text-text-muted font-mono">{cert.certificateNumber}</span>
                <Button size="sm" variant="secondary" onClick={() => setSelectedCert(cert)} leftIcon={<Award size={14} />}>
                  View Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visual Certificate Modal */}
      {selectedCert && (
        <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} title="Official Certificate">
          <div className="p-8 bg-gradient-to-br from-surface-50 to-primary-50/30 rounded-2xl border-4 border-double border-primary-200 text-center space-y-6 relative overflow-hidden">
            <div className="flex justify-center items-center gap-2">
              <GraduationCap size={28} className="text-primary-600" />
              <span className="font-bold text-lg text-text-primary">Learn<span className="gradient-text">Sphere</span></span>
            </div>

            <p className="text-xs uppercase tracking-widest text-primary-600 font-bold">Certificate of Completion</p>

            <div className="space-y-1">
              <p className="text-xs text-text-muted">This is to certify that</p>
              <h2 className="text-2xl font-black text-text-primary underline decoration-primary-300">{user?.name || 'Alex Johnson'}</h2>
              <p className="text-xs text-text-muted">has successfully completed the online course</p>
            </div>

            <h3 className="text-xl font-bold text-primary-700 max-w-md mx-auto">{selectedCert.courseName}</h3>

            <div className="flex justify-between items-end pt-8 border-t border-primary-200 text-xs">
              <div className="text-left">
                <p className="font-bold text-text-primary">{selectedCert.instructorName}</p>
                <p className="text-[10px] text-text-muted">Lead Instructor</p>
              </div>

              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-[10px] shadow-primary">
                LS SEAL
              </div>

              <div className="text-right">
                <p className="font-mono text-[10px] text-text-muted">{selectedCert.certificateNumber}</p>
                <p className="text-[10px] text-text-muted">Issued: {formatDate(selectedCert.issuedAt)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button size="sm" variant="secondary" onClick={() => alert('Certificate downloaded as PDF!')} leftIcon={<Download size={14} />}>
              Download PDF
            </Button>
            <Button size="sm" onClick={() => alert('Certificate link copied to clipboard!')} leftIcon={<Share2 size={14} />}>
              Share Link
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
