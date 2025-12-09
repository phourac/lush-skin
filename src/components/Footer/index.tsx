import React from 'react';

import CopyRight from './CopyRight';
import FooterInfo from './FooterInfo';
import Support from './Support';

const Footer = () => {
  return (
    <div className='pt-[44px]'>
      <CopyRight />
      <Support />
      <FooterInfo />
    </div>
  );
};

export default Footer;
