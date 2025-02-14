import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";

actor CommentManager {
  public type Comment = {
    imageUrl : Text;
    text : Text;
    timestamp : Int;
  };

  private var comments : [Comment] = [];

  public func createComment(imageUrl : Text, text : Text) : async [Comment]  {
    let newComment : Comment = {
      imageUrl;
      text;
      timestamp = Time.now();
    };

    comments := Array.append<Comment>(comments, [newComment]);

    return comments;
  };

  public query func getAllComments() : async [Comment] {
    return comments
  };
};
