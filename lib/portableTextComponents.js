export const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-md text-gray-600 leading-relaxed mb-5">{children} </p>
    ),

    h2: ({ children }) => (
      <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
        {children}
      </h3>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="space-y-4 mb-8">{children}</ul>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-600 text-md">
        {" "}
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
        {children}{" "}
      </li>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-teal-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}{" "}
      </a>
    ),
  },
};
