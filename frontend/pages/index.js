import Head from "next/head";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/notes"
      );
      const data = await response.json();
      setCards(data.data);
      console.log(data.data);
    };

    fetchCards();
  }, []);

  return (
    <>
      <Navbar />
      <Head>
        <title>NotesTaker</title>
        <link
          rel="icon"
          href="https://64.media.tumblr.com/20ab53ba82cea0fe54a808e9f38ba476/245530516260c944-1b/s1280x1920/81c17e369f5fd5c8e32a1bd59b2dd9c3c0fa08fd.pnj"
        />
      </Head>
      <main className={`p-24 ${inter.className}`}>
        <h1 className="text-6xl font-bold text-center">Class Summaries</h1>
        <hr className="my-10" />
        <div className="space-y-5">
          {cards ? (
            cards.map((card) => (
              <Card
                key={card.id}
                date={card.date}
                summary={card.summary}
                url={`/notes/${card.id}`}
                router={router}
              />
            ))
          ) : (
            <p className="text-center">No summaries yet.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
