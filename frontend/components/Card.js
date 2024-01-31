import Link from "next/link";

const Card = ({ date, summary, url, router }) => {
  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  const parseDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(url);
      }}
      className="bg-white cursor-pointer border-2 shadow overflow-hidden sm:rounded-lg"
    >
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {parseDate(date)}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {truncate(summary)}
          </p>
        </div>
        <Link className="text-blue-600 hover:text-blue-500" href={url}>
          See more
        </Link>
      </div>
    </div>
  );
};

export default Card;
