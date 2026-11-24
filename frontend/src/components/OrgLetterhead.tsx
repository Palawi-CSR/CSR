import React from 'react';
import { ORG } from '../data/orgProfile';

/** Palawi / Prabha-Hira Pratishthan letterhead used on receipts and official letters. */
export const OrgLetterhead: React.FC = () => (
  <div className="receipt-letterhead">
    <img src="/logo.png" alt="Palawi" className="receipt-logo" />
    <div className="receipt-org">
      <div className="receipt-org-name">{ORG.name}</div>
      <div className="receipt-org-tagline">{ORG.tagline}</div>
      <div className="receipt-org-address">
        <span className="text-black">Reg address : </span>
        {ORG.address}
        <br />
        Tel: {ORG.phone}, Email: <a href={`mailto:${ORG.email}`}>{ORG.email}</a>, Website:{' '}
        <a href={`https://${ORG.website}`}>{ORG.website}</a>
      </div>
    </div>
  </div>
);

/** President + Secretary signature block, as on the organisation's letters. */
export const OrgSignatures: React.FC<{ secretaryOnly?: boolean }> = ({ secretaryOnly }) => (
  <div className={`letter-signatures ${secretaryOnly ? 'justify-end' : 'justify-between'}`}>
    {!secretaryOnly && (
      <div className="letter-sign">
        <div className="letter-sign-space" />
        <div className="font-bold">{ORG.president}</div>
        <div>President</div>
      </div>
    )}
    <div className="letter-sign">
      <div className="letter-sign-space" />
      <div className="font-bold">{ORG.secretary}</div>
      <div>Secretary</div>
    </div>
  </div>
);
