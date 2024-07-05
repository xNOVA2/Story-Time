import { useEffect } from "react";
import { useChatStore } from "@/store/socket.store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserMessageList } from "@/components/UserMessageList";
import { ChatListSkeleton } from "@/components/skeletons/ChatListSkeleton";

export default function ChatList() {
  const { chatList,currentChatId,fetchChatList } = useChatStore();

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  return (
    <div className="max-w-80 overflow-x-hidden w-full flex flex-col border-2 border-borderCol h-[800px] overflow-y-auto">
      <div className="relative border-b-2 border-borderCol">
        <Input
          placeholder="Search Message"
          className="px-16 mt-2 py-9 border-none placeholder:text-lg placeholder:opacity-30"
        />
        <Search className="size-9 text-primaryCol absolute top-7 left-3" />
      </div>
      {!chatList ? (
        <ChatListSkeleton />
      ) : (
        chatList?.data?.data?.length > 0 &&
        chatList.data.data.map((chatItem:any) => (
          <UserMessageList
            key={chatItem._id}
            chat={chatItem}
            activeChatId={currentChatId!}
          />
        ))
      )}
    </div>
  );
}