"use client";

import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown, FaStar } from "react-icons/fa";
import { useReviewsByName } from "@/hooks/useReviewsByName";
import { useAuth } from "@/provider/AuthContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const ReviewSection = ({ name }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [newReview, setNewReview] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [replyToggles, setReplyToggles] = useState({});
  const { reviews, reviewIsLoading, reviewError, reviewRefetch } =
    useReviewsByName(name);

  const handleReplyToggle = (index) => {
    setReplyToggles((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleReplyChange = (index, value) => {
    setReplyInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmitReview = async () => {
    if (!newReview.trim()) return;

    try {
      await axiosPublic.post("/api/reviews", {
        productName: name,
        reviewerName: user.name || "Anonymous",
        review: newReview,
        rating: 0,
        likes: 0,
        replies: [],
      });
      setNewReview("");
      reviewRefetch();
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleSubmitReply = async (reviewIndex) => {
    const replyText = replyInputs[reviewIndex]?.trim();
    if (!replyText) return;

    try {
      await axiosPublic.patch(`/api/reviews/${name}/reply`, {
        reviewIndex,
        replierName: user.name || "Anonymous",
        reply: replyText,
      });
      setReplyInputs((prev) => ({ ...prev, [reviewIndex]: "" }));
      reviewRefetch();
    } catch (err) {
      console.error("Failed to submit reply:", err);
    }
  };

  const handleLikeDislike = async (reviewIndex) => {
    try {
      await axiosPublic.patch(`/api/reviews/${name}/like`, {
        reviewIndex,
      });
      reviewRefetch();
    } catch (err) {
      console.error("Failed to like review:", err);
    }
  };

  if (reviewIsLoading)
    return <p className="text-center py-10">Loading reviews...</p>;
  if (reviewError)
    return (
      <p className="text-center py-10 text-gray-600">Failed to load reviews.</p>
    );

  return (
    <section className="w-11/12 mx-auto py-6">
      <div className="rounded-lg mb-6 py-3 sm:py-4 md:py-5 lg:py-6 w-3/4">
        <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-5xl font-medium exo mb-2 sm:mb-3 lg:mb-5 xl:mb-6 2xl:mb-8">
          Write a Review
        </h2>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="w-full p-2 roboto sm:p-3 md:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143694] resize-none text-xs sm:text-sm md:text-base mb-2 sm:mb-3"
          rows={3}
        />
        <button
          onClick={handleSubmitReview}
          className="bg-[#173faf] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-[#143694] transition text-xs sm:text-sm md:text-base"
        >
          Submit Review
        </button>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6 w-3/4">
        <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-5xl font-medium exo mb-2 sm:mb-3 lg:mb-5 xl:mb-6 2xl:mb-8">
          Reviews
        </h1>

        {reviews.map((reviewItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base sm:text-lg md:text-xl font-medium roboto">
                {reviewItem.reviewer.name}
              </h3>
              <div className="flex text-yellow-500 mt-1 roboto">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < Math.round(reviewItem.rating)
                        ? "fill-yellow-500"
                        : "fill-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-base xl:text-lg 2xl:text-xl leading-relaxed roboto mt-2">
              "{reviewItem.review}"
            </p>

            <div className="flex items-center gap-4 text-gray-600 text-sm sm:text-base xl:text-lg 2xl:text-xl mt-2">
              <button
                className="flex items-center gap-1 hover:text-[#173faf] roboto"
                onClick={() => handleLikeDislike(index)}
              >
                <FaThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span>{reviewItem.likes}</span>
              </button>
              <button
                className="hover:text-[#173faf] cursor-pointer roboto"
                onClick={() => handleReplyToggle(index)}
              >
                Reply
              </button>
            </div>

            {replyToggles[index] && (
              <div className="mt-2 sm:mt-3 pl-3 sm:pl-4 border-l border-gray-200 space-y-2 sm:space-y-3">
                {reviewItem.replies.length > 0 &&
                  reviewItem.replies.map((reply, rIndex) => (
                    <div key={rIndex} className="flex flex-col gap-1">
                      <h4 className="text-sm sm:text-base xl:text-lg 2xl:text-xl font-medium roboto">
                        {reply.name}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base xl:text-lg 2xl:text-xl roboto">
                        {reply.reply}
                      </p>
                    </div>
                  ))}

                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    value={replyInputs[index] || ""}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#143694] resize-none text-xs sm:text-sm md:text-base"
                    rows={2}
                  />
                  <button
                    onClick={() => handleSubmitReply(index)}
                    className="self-end bg-[#173faf] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-[#143694] transition text-xs sm:text-sm md:text-base"
                  >
                    Submit Reply
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
