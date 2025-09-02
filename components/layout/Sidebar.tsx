"use client";

import { useState } from "react";
import pinButton from "../../public/icons/pinIcon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { main, influencer, campaign } from "./slidebarItems";

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 닫힌 직후 즉시 호버로 열리는 걸 막기 위한 잠금 플래그
  const [hoverUnlocked, setHoverUnlocked] = useState(true);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    if (newCollapsedState) {
      // 닫히는 순간: 호버로 다시 열리지 않도록 잠금
      setIsHovered(false);
      setHoverUnlocked(false);
    } else {
      // 열릴 땐 잠금 해제
      setHoverUnlocked(true);
    }
  };

  const handleMouseEnter = () => {
    // 완전히 닫혀 있고, 잠금이 풀렸을 때만 호버 확장
    if (isCollapsed && hoverUnlocked) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovered(false);
      // 한번 나갔다가 다시 들어올 때부터 호버 허용
      setHoverUnlocked(true);
    }
  };

  const isExpanded = isCollapsed ? isHovered : true;

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Sidebar className={`h-screen ${isExpanded ? "w-64" : "w-16"}`}>
        <SidebarContent>
          {/* 헤더 섹션 */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {isExpanded && <span className="text-sm font-medium">Aaron</span>}
            </div>
            {isCollapsed ? (
              <button
                onClick={handleToggle}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <img src={pinButton.src} alt="pin" className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-4 h-4 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* 메인 메뉴 */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col">
                {main.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        {isExpanded && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* 인플루언서 그룹 */}
          <SidebarGroup>
            {isExpanded && (
              <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                인플루언서
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {influencer.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        {isExpanded && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* 캠페인 그룹 */}
          <SidebarGroup>
            {isExpanded && (
              <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                캠페인
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {campaign.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        {isExpanded && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
