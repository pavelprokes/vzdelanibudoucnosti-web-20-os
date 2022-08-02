import React from "react"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"

export const TerminalWindow = ({ children }: Props) => {
  return (
    <TerminalWindowWrapper>
      <div className="terminal space shadow">
        <div className="top">
          <div className="btns">
            <span className="circle red" />
            <span className="circle yellow" />
            <span className="circle green" />
          </div>
          <div className="title">Terminal -- 70x32</div>
        </div>
        <pre className="body">{children}</pre>
      </div>
    </TerminalWindowWrapper>
  )
}

interface Props {
  children: React.ReactNode
}

const TerminalWindowWrapper = styled.div`
  .terminal {
    border-radius: 5px 5px 0 0;
    position: relative;
  }
  .terminal .top {
    background: #e8e6e8;
    color: black;
    padding: 5px;
    border-radius: 5px 5px 0 0;
  }
  .terminal .btns {
    position: absolute;
    top: 7px;
    left: 5px;
  }
  .terminal .circle {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 15px;
    margin-left: 2px;
    border-width: 1px;
    border-style: solid;
  }
  .title {
    text-align: center;
  }
  .red {
    background: #ec6a5f;
    border-color: #d04e42;
  }
  .green {
    background: #64cc57;
    border-color: #4ea73b;
  }
  .yellow {
    background: #f5c04f;
    border-color: #d6a13d;
  }
  .clear {
    clear: both;
  }
  .terminal .body {
    background: black;
    color: #7afb4c;
    padding: 8px;
    overflow: auto;

    min-width: 400px;
    min-height: 200px;
  }
  .space {
    margin: 25px;
  }
  .shadow {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }

  ${md} {
    display: none;
  }
`
