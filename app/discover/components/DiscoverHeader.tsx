"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Search,
  Filter,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  Users,
} from "lucide-react";

interface DiscoverHeaderProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  totalInfluencers: number;
}

export function DiscoverHeader({
  selectedPlatform,
  onPlatformChange,
  globalFilter,
  onGlobalFilterChange,
  totalInfluencers,
}: DiscoverHeaderProps) {
  const platforms = [
    {
      key: "instagram",
      label: "인스타그램",
      icon: Instagram,
      active: selectedPlatform === "instagram",
    },
    {
      key: "youtube",
      label: "유튜브",
      icon: Youtube,
      active: selectedPlatform === "youtube",
    },
    {
      key: "twitter",
      label: "엑스",
      icon: Twitter,
      active: selectedPlatform === "twitter",
    },
    {
      key: "tiktok",
      label: "틱톡",
      icon: MessageCircle,
      active: selectedPlatform === "tiktok",
    },
    {
      key: "naver",
      label: "네이버 블로그",
      icon: MessageCircle,
      active: selectedPlatform === "naver",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">인플루언서 찾기</h1>
        <Button variant="outline" className="text-sm">
          <a
            href="https://docs.channel.io/featuring_guide/ko/categories/%EC%9D%B8%ED%94%8C%EB%A3%A8%EC%96%B8%EC%84%9C-%EC%B0%BE%EA%B8%B0-3bcc58ec"
            target="_blank"
          >
            인플루언서 찾기 가이드
          </a>
        </Button>
      </div>

      {/* 플랫폼 필터 */}
      <div className="flex space-x-2 mb-4">
        {platforms.map((platform) => (
          <Button
            key={platform.key}
            variant={platform.active ? "default" : "outline"}
            size="sm"
            onClick={() => onPlatformChange(platform.key)}
            className="flex items-center space-x-2"
          >
            <platform.icon className="h-4 w-4" />
            <span>{platform.label}</span>
          </Button>
        ))}
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="키워드 검색"
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>고급 필터 설정</span>
          <Badge variant="secondary" className="text-xs">
            NEW
          </Badge>
        </Button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.
      </p>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Users className="h-4 w-4" />
        <span>
          총 {totalInfluencers.toLocaleString()} 명의 인플루언서를 찾았습니다.
        </span>
        <span className="text-gray-400">(필터 설정 전)</span>
      </div>
    </div>
  );
}
