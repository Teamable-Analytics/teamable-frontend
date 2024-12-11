import { InfoItem } from "@/_temp_types/homeAttributes"

const InfoSection = ({
  title,
  items = [],
}: {
  title: string;
  items?: InfoItem[];
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="border border-gray-300 p-4 rounded-md">
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center"
            >
              <span>{item.label}:</span>
              <b>{item.value}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  </div>
)

InfoSection.defaultProps = {
  items: [],
}

export default InfoSection
