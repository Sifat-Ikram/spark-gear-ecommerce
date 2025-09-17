import { useOrdersByEmail } from "@/hooks/useOrdersByEmail";
import UserOrderCard from "./UserOrderCard";

const UserOrders = ({ currentUser }) => {
  const { orders, orderIsLoading, orderError, orderRefetch } = useOrdersByEmail(
    currentUser?.email
  );

  if (orderIsLoading) {
    return <div>Loading orders...</div>;
  }

  if (orderError) {
    return <div>Failed to load orders. Please try again later.</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="min-h-screen space-y-14">
      <h1 className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-800">
        My Orders
      </h1>
      <div className="flex flex-col space-y-10">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center mt-4 text-sm sm:text-base lg:text-lg 2xl:text-xl">
            No {selectedStatus} orders found.
          </p>
        ) : (
          orders.map((order) => (
            <UserOrderCard
              key={order._id}
              order={order}
              orderRefetch={orderRefetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrders;
