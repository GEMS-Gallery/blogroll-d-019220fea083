import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  // Define the structure for a blog entry
  type BlogEntry = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  // Initialize a stable variable to store blog entries
  stable var entries : [BlogEntry] = [];
  stable var nextId : Nat = 0;

  // Function to add a new blog entry
  public func addEntry(title: Text, content: Text) : async Nat {
    let id = nextId;
    let timestamp = Time.now();
    let newEntry : BlogEntry = {
      id;
      title;
      content;
      timestamp;
    };
    entries := Array.append(entries, [newEntry]);
    nextId += 1;
    id
  };

  // Function to get all blog entries
  public query func getEntries() : async [BlogEntry] {
    entries
  };

  // Function to delete a blog entry
  public func deleteEntry(id: Nat) : async Bool {
    let oldLength = entries.size();
    entries := Array.filter(entries, func (entry: BlogEntry) : Bool {
      entry.id != id
    });
    entries.size() < oldLength
  };
}
