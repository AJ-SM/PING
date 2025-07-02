import React, { useEffect, useState } from "react";

interface MessageProp {
  icon?: string;
  name: string;
  message: string;
  // optionally pass ID for easier fetch
  id?: number;
}

const typeColors: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

export function MessageBox(props: MessageProp) {
  let { icon, name, message, id } = props;
  if (icon == null) {
    icon = "../public/billon.jpg";
  }

  const [type, setType] = useState<string | null>(null);

  // Helper: extract ID from icon URL if id not passed
  const getIdFromIcon = (iconUrl: string) => {
    // Example icon URL: ".../25.png"
    const match = iconUrl.match(/(\d+)\.png$/);
    if (match) return Number(match[1]);
    return null;
  };

  // Use ID from prop or extract from icon
  const pokemonId = id ?? (icon ? getIdFromIcon(icon) : null);

  useEffect(() => {
    if (!pokemonId) {
      setType(null);
      return;
    }

    // Fetch type from PokeAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.types && data.types.length > 0) {
          // Take first type only
          setType(data.types[0].type.name);
        } else {
          setType(null);
        }
      })
      .catch(() => setType(null));
  }, [pokemonId]);

  // Get color based on fetched type or default to white
  const nameColor = (type && typeColors[type.toLowerCase()]) || "white";

  return (
    <div className="flex text-white gap-2 mb-3 bg-[#343a40] rounded-2xl">
      <img className="w-11 h-11 rounded-full" src={icon} alt="" />
      <div>
        <div
          className="font-mono font-extrabold text-lg mt-1.5"
          style={{ color: nameColor }}
        >
          {name}
        </div>
        <div className="font-mono font-light ml-2 p-1.5 w-170">{message}</div>
      </div>
    </div>
  );
}














// import type { ReactElement } from "react"

// interface MessageProp {
//     icon?:string ,
//     name:string,
//     message:string

// }



// export function MessageBox(props:MessageProp){
//     let {icon,name,message} = props
//     if (icon ==null){
//         icon="../public/billon.jpg";
//     }
//     return(
//         <div className="flex text-white gap-2 mb-3 bg-[#343a40] rounded-2xl">
//             <img  className="w-11 h-11  rounded-full" src={icon} alt="" />
           
//             <div>
//                 <div className="font-mono font-extrabold text-lg mt-1.5">{name}</div>
//                 <div className="font-mono font-light ml-2 p-1.5 w-170">{message}</div>
//             </div>

//         </div>
//     )
// }