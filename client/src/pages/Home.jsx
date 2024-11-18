import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { FaRegUser, FaRegRectangleList, FaRegMap } from "react-icons/fa6";
import menuOptions from "../constants/menu";
import { GET_ADDRESS } from "../graphql/queries/address.query";
import { setAddresses } from "../store/addressesSlice";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const addresses = useSelector((state) => state.addresses);
  const { name, group } = user.userData;

  console.log(addresses);
  // console.log(addresses);

  // Mapeamento de ícones
  const iconsMap = {
    Tarjetas: FaRegRectangleList,
    Dirección: FaRegMap,
    Perfil: FaRegUser,
  };

  // Lazy Query para obter endereços
  const [fetchAddresses, { data, loading, error }] = useLazyQuery(GET_ADDRESS, {
    variables: {
      action: "get",
      addressId: "",
      input: {
        street: "",
        active: true,
        city: "",
        confirmed: true,
        neighborhood: "",
      },
    },
    onCompleted: (data) => {
      if (data) {
        console.log("DATA: ", data.address.address);
        dispatch(setAddresses({ addresses: data.address.address }));
      }
    },
  });

  // Realiza a consulta somente uma vez na montagem se não houver dados e o grupo for diferente de 0
  useEffect(() => {
    // Verifica apenas uma vez na montagem e quando addresses estiver vazio
    if (group !== 0 && (!addresses || addresses.length === 0)) {
      fetchAddresses();
    }
  }, [group, addresses]);

  return (
    <div className="w-full min-h-screen text-black pb-32 px-6 flex flex-col items-center">
      {/* Título de boas-vindas */}
      <motion.div
        className="w-full max-w-3xl text-center mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-light tracking-wide mb-8">
          Bienvenido, <span className="font-medium">{name}</span>.
        </h1>
        <p className="text-lg text-gray-600">
          Para comenzar, elija una de las siguientes opciones:
        </p>
      </motion.div>

      {/* Botão para atualizar os dados manualmente */}
      {group !== 0 && (
        <button
          onClick={fetchAddresses}
          className="mt-4 py-2 px-6 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
        >
          {loading ? "Atualizando..." : "Atualizar Endereços"}
        </button>
      )}

      {/* Opções de Menu */}
      <div className="flex flex-col w-full max-w-2xl mt-4">
        {Object.entries(menuOptions).map(([key, item]) => {
          const IconComponent = iconsMap[item.label];

          return (
            <motion.div
              key={key}
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 * key,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02, opacity: 0.95 }}
            >
              <Link
                to={item.path}
                className="flex gap-7 pt-10  h-full border-t border-details"
              >
                {IconComponent && (
                  <IconComponent
                    size={38}
                    color="black"
                    className="flex-shrink-0"
                  />
                )}
                <p className="font-medium text-4xl tracking-widest ">
                  {item.label}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Exibe erros se houver */}
      {error && (
        <p className="text-red-500 mt-4">
          Ocorreu um erro ao atualizar os endereços.
        </p>
      )}
    </div>
  );
}
