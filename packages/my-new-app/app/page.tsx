'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@myorg/mylib';
import styles from './page.module.css';
import { FormEvent, useState } from 'react';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  const messages = useQuery(api.messages.list) || [];
  const [newMessageText, setNewMessageText] = useState('');
  const sendMessage = useMutation(api.messages.send);
  const [name] = useState(() => 'User ' + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    await sendMessage({ body: newMessageText, author: name });
    setNewMessageText('');
  }
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome my-new-app 👋
            </h1>
            {messages.map(({ _id, author, body }) => (
              <div key={_id.toString()}>
                {author}: {body}
              </div>
            ))}
            <form onSubmit={handleSendMessage}>
              <input
                onChange={(event) => setNewMessageText(event.target.value)}
                placeholder="Write a message…"
              />
              <input type="submit" value="Send" disabled={!newMessageText} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
