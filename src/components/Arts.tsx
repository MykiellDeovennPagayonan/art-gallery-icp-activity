/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { CardBody, CardContainer } from "./ui/3d-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { backend } from "@/declarations/backend";
import { Comment } from "@/lib/interface";

interface ArtsProps {
  imageUrl: string;
  title: string;
  description: string;
  initialComments: Comment[];
}

export default function Arts({
  imageUrl,
  title,
  description,
  initialComments,
}: ArtsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([...initialComments].sort((a, b) => {
    return Number(a.timestamp) - Number(b.timestamp);
  }));
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    if (initialComments) {
      const sortedInitialComments = [...initialComments].sort((a, b) => {
        return Number(a.timestamp) - Number(b.timestamp);
      });
      setComments(sortedInitialComments)
    }
  }, [initialComments])

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim()) {
      setIsPosting(true); // Start loading
      try {
        const updatedComments: Comment[] = await backend.createComment(
          imageUrl,
          newComment
        );
        const sortedComments = [...updatedComments].sort((a, b) => {
          return Number(a.timestamp) - Number(b.timestamp);
        });
        const artworkSortedComments = sortedComments ? sortedComments.filter(comment => comment.imageUrl === imageUrl) : []
        setComments(artworkSortedComments);
        setNewComment("");
      } catch (error) {
        console.error("Error posting comment:", error);
      } finally {
        setIsPosting(false);
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw]">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <CardContainer className="inter-var w-full h-full flex justify-center items-center">
          <CardBody className="relative rounded-2xl border-2 border-gray-400 shadow-xl overflow-hidden cursor-pointer">
            <div onClick={() => setIsOpen(true)}>
              <img
                src={imageUrl}
                alt={title}
                className="object-fill h-full max-h-[90vh] w-full rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            </div>
          </CardBody>
        </CardContainer>

        <DialogContent className="max-w-xl max-h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <img
              src={imageUrl}
              alt={title}
              width={800}
              height={600}
              className="object-cover w-full rounded-lg"
            />
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Comments</h4>
            <div className="max-h-72 overflow-y-auto border rounded-md px-2 py-1">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-700 border-b py-1 last:border-none"
                  >
                    <span className="font-bold">Anonymous: </span> {comment.text}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="mt-2 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="self-end" disabled={isPosting}>
                {isPosting ? "Posting..." : "Post"} {/* Display loading text or normal text */}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
