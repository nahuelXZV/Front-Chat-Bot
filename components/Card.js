import Image from "next/image";
export default function Card({ title, facebookId, data = [], tags, image }) {
  return (
    <>
      <div class="mb-2 shadow-lg rounded-xl w-72 md:w-80 p-3 bg-white relative overflow-hidden">
        <a class="w-full h-full block">
          <div class="flex items-center border-b-2 mb-2 py-2">
            <Image
              src={image}
              alt="Picture of the author"
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div class="pl-3">
              <div class="font-medium">{title}</div>
              <div class="text-gray-600 text-sm">FacebookId: {facebookId}</div>
            </div>
          </div>
          <div class="w-full mb-3">
            {data.map((dat, index) => {
              return (
                <p class="text-gray-600 text-sm font-medium mb-0.1">
                  <span className="text-gray-800 text-sm font-bold">
                    {dat.key}: &nbsp;
                  </span>
                  {dat.value}
                </p>
              );
            })}
          </div>
          {/* tags con colores */}
          <div class="flex flex-row">
            <div class="flex basis-1/2">
              <button class="bg-blue-500 text-xs hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-full">
                Editar
              </button>
              <button class="bg-red-500 text-xs hover:bg-red-700 text-white font-medium py-1 px-2 rounded-full ml-1">
                Eliminar
              </button>
            </div>
            <div class="flex basis-1/2">
              {tags.map((tag, index) => {
                return (
                  <button class="ml-1 bg-{tag.color}-200 text-{tag.color}-800 text-xs font-medium rounded-full px-2 py-1 hover:bg-{tag.color}-300">
                    {tag.title}
                  </button>
                );
              })}
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
