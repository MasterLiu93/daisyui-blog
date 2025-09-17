import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  path: string;
  name: string;
  icon?: string;
}

interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ title, items }: BreadcrumbProps) => {
  const location = useLocation();
  
  return (
    <div className="mb-6">
      <div className="text-sm breadcrumbs mb-2">
        <ul>
          <li>
            <Link to="/system/dashboard" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              </svg>
              系统
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index}>
              {index < items.length - 1 ? (
                <Link to={item.path} className="flex items-center">
                  {item.icon && (
                    <span className={`${item.icon} mr-1`}></span>
                  )}
                  {item.name}
                </Link>
              ) : (
                <span className="flex items-center text-primary font-medium">
                  {item.icon && (
                    <span className={`${item.icon} mr-1`}></span>
                  )}
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default Breadcrumb; 