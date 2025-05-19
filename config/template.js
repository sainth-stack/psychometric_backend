export const statusUpdateTemplate = ({ candidateEmail, candidateId, customMessage }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Assessment Submitted</h2>
      <p><strong>Candidate Email:</strong> ${candidateEmail}</p>
      <p><strong>Candidate ID:</strong> ${candidateId}</p>
      <p>${customMessage}</p>
    </div>
  `;
};
