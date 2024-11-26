import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardsSidebar from "../components/Cards/CardsSidebar";
import Card from "../components/Cards/Card";
import UpdateCard from "../components/Cards/UpdateCard";
import NewCard from "../components/Cards/NewCard";
import AssignCard from "../components/Cards/AssignCard";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_CARDS } from "./../graphql/queries/cards.query";
import { setCards } from "../store/cardsSlice";

function Cards() {
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(
    () => new URLSearchParams(location.search).get("tab") || "new-address"
  );

  const [fetchCards, { loading, error }] = useLazyQuery(GET_CARDS, {
    variables: {
      action: "get",
    },
    onCompleted: (data) => {
      if (data && data.card) {
        dispatch(setCards({ cards: data.card }));
      }
    },
  });

  useEffect(() => {
    if (!cards?.cards || cards.cards.length === 0) {
      fetchCards();
    }
  }, [fetchCards]);

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(location.search).get("tab");

    if (!tabFromUrl) {
      // Redireciona somente se necessário
      if (tab !== "cards") {
        navigate("?tab=cards", { replace: true });
      }
    } else if (tabFromUrl !== tab) {
      setTab(tabFromUrl);
    }
  }, [location.search, navigate, tab]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    console.error("Erro ao buscar os cards:", error);
    return <p>Erro ao carregar os cards. Tente novamente mais tarde.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary">
      <div>{<CardsSidebar />}</div>
      {tab === "cards" && <Card />}
      {tab === "crear" && <NewCard />}
      {tab === "modificar" && <UpdateCard />}
      {tab === "asignar" && <AssignCard />}
    </div>
  );
}

export default Cards;