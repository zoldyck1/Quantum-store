import React from 'react';

export const PayPalIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <img
    src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
    alt="PayPal"
    className={className}
  />
);

export const CryptoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <img
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/tether-usdt-icon-svg-png-download-5645458.png?f=webp"
    alt="USDT"
    className={className}
  />
);

export const BankIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <img
    src="https://play-lh.googleusercontent.com/4hn18ZzwGHR7-1ZBBvDYEiU_CmGAXBNjKqBaMKidS9S9YjE4Zk5zzhY0-K8u-k8AdAbT"
    alt="Bank Transfer"
    className={className}
  />
);

