import { GlobalStyle } from "components/GlobalStyles";
import UisComment from "components/icons/UisComment";
import React, { useState } from "react";
import styled from "styled-components";
import { generateRandom, PARA } from "utils";

type MessageType = {
  id: any;
  text: string;
  sent: boolean;
};

const RES_ARRAY = [
  {
    id: 1,
    text: `ChatGPT is surely the best
  But its servers are put to the test`,
    sent: false,
  },
  {
    id: 2,
    text: `With so many users chatting
  It's no wonder they're lagging`,
    sent: false,
  },
  {
    id: 3,
    text: `But they'll fix it soon, no need to fret!`,
    sent: false,
  },
];

const ChatI = (p: MessageType) => {
  return <ChatItem sent={p.sent}>{p.text}</ChatItem>;
};

function App() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [thinking, setThinking] = useState(false);
  const [message, setMessage] = useState("");

  const onSend = (e: any) => {
    e.preventDefault();

    console.log(message);

    setMessage("");

    setMessages((s) => [...s, { id: Date.now, text: message, sent: true }]);

    setThinking(true);

    setTimeout(() => {
      setMessages((s) => [...s, RES_ARRAY[generateRandom(0, RES_ARRAY.length - 1)]]);
      setThinking(false);
    }, 3000);

    //   const data = new FormData(form);
    // for (const [name,value] of data) {
    //   console.log(name, ":", value)
    // }
  };

  return (
    <>
      <GlobalStyle />
      {/* <p>{PARA}</p> */}
      <Root className="talking">
        {open && (
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>

            <CardBody>
              {messages.map((i) => {
                return <ChatI key={i.id} {...i} />;
              })}

              {thinking && <center style={{ padding: 10 }}>Thinking....</center>}
            </CardBody>

            <CardBottom>
              <form onSubmit={onSend}>
                <CardInput id="message" placeholder="Enter a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </form>

              <CardAction></CardAction>
            </CardBottom>
          </Card>
        )}

        <StartBtn onClick={() => setOpen((s) => !s)}>
          <UisComment className="svgIcon" />
        </StartBtn>
      </Root>
    </>
  );
}

export default App;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  right: 10px;
  align-items: flex-end;
  gap: 0.4rem;
`;
const StartBtn = styled.div`
  height: 48px;
  aspect-ratio: 1;
  border-radius: 120px;
  background: var(--primary);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 300px;
  max-width: 90vw;
  max-height: 80vh;
  height: 600px;
  background: white;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: var(--primary);
  padding: 12px var(--contentMargin);
  color: #fff;
`;
const CardTitle = styled.div`
  font-weight: 600;
`;

const CardBottom = styled.div`
  /* background: rgba(0, 0, 0, 0.05); */
  display: flex;
  form {
    flex: 1;
  }
`;
const CardInput = styled.input`
  font-size: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  flex: 1;
  min-height: 48px;
  padding: 0px var(--contentMargin);
  outline: none;
  width: 100%;
`;
const CardAction = styled.div``;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  padding: 10px var(--contentMargin);
  overflow: auto;
`;

const ChatItem = styled.div<any>`
  padding: 10px;
  background: ${(p) => (!p.sent ? "var(--primary)" : "rgba(0,0,0,0.12)")};
  color: ${(p) => (!p.sent ? "#fff" : "rgba(0,0,0,0.9)")};
  align-self: ${(p) => (!p.sent ? "flex-start" : "flex-end")};
  border-radius: 12px;
  max-width: 70%;
`;
