import { sm, md } from "./mediaQuery"

export const mobileResponsive = `
    ${md} {
      h1.ant-typography {
        font-size: 26px;
        margin-bottom: 0.25em;
      }
      
      h2.ant-typography {
        font-size: 24px;
        margin-bottom: 0.25em;
      }
      
      h3.ant-typography {
        font-size: 21px;
        margin-bottom: 0.25em;
      }
      
      h4.ant-typography {
        font-size: 18px;
        margin-bottom: 0.25em;
      }
    }
    
    ${sm} {
      h1.ant-typography {
        font-size: 21px;
        margin-bottom: 0.25em;
      }
      
      h2.ant-typography {
        font-size: 18px;
        margin-bottom: 0.25em;
      }
      
      h3.ant-typography {
        font-size: 16px;
        margin-bottom: 0.25em;
      }
      
      h4.ant-typography {
        font-size: 16px;
        margin-bottom: 0.25em;
      }
    }
`
