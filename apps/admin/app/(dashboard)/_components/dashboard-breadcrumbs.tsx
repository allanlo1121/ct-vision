"use client";

import { usePathname } from "next/navigation"
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as Item,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";

import { MenuNode } from "@workspace/system/menu";
import { findBreadcrumbsByPath } from "@/lib/navigation/breadcrumb";

interface Props {
  menus: MenuNode[];
}

export function DashboardBreadcrumbs({ menus }: Props) {
  const pathname = usePathname();
  const breadcrumbs = findBreadcrumbsByPath(pathname, menus);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((b, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <React.Fragment key={i}>
              <Item>
                {b.active || isLast || !b.href ? (
                  <BreadcrumbPage>{b.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                )}
              </Item>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}{" "}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
