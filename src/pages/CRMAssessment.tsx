
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CRMAssessment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to project setup instead
    navigate('/project-setup', { replace: true });
  }, [navigate]);

  return null;
};

export default CRMAssessment;
