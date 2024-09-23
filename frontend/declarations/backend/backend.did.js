export const idlFactory = ({ IDL }) => {
  const BlogEntry = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addEntry' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'getEntries' : IDL.Func([], [IDL.Vec(BlogEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
