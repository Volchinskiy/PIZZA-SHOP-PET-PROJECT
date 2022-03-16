import ContentLoader from "react-content-loader";

import React from 'react'

export default function LodingBlock() {
 return(
    <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="136" cy="132" r="113" />  
    <rect x="0" y="258" rx="6" ry="6" width="280" height="30" /> 
    <rect x="0" y="298" rx="6" ry="6" width="280" height="74" /> 
    <rect x="0" y="400" rx="6" ry="6" width="84" height="27" /> 
    <rect x="123" y="385" rx="23" ry="23" width="156" height="55" />
  </ContentLoader>
  )
}



