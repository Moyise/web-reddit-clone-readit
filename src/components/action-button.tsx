const ActionButton: React.FC = ({ children }) => (
  <button className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
    {children}
  </button>
);

export default ActionButton;
