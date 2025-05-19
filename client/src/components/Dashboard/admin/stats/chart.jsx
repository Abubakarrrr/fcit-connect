"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip } from "recharts"

const ChartContext = React.createContext(null)

function ChartContainer({ config, className, children, ...props }) {
  const colorStyles = React.useMemo(() => {
    if (!config) return {}

    return Object.entries(config).reduce((styles, [key, value]) => {
      if (value && typeof value === "object" && value.color) {
        styles[`--color-${key}`] = value.color
      }
      return styles
    }, {})
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          ...colorStyles,
        }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartTooltip({ indicator = "line", content = ChartTooltipContent, ...props }) {
  return (
    <Tooltip
      content={content}
      cursor={
        indicator === "line"
          ? { stroke: "hsl(var(--muted-foreground))", strokeDasharray: "4 4" }
          : { fill: "hsl(var(--muted-foreground))", fillOpacity: 0.1 }
      }
      {...props}
    />
  )
}

function ChartTooltipContent({ active, payload, label }) {
  const { config } = React.useContext(ChartContext)

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => {
            const dataKey = item.dataKey
            const itemConfig = config?.[dataKey]
            const itemName = itemConfig?.label || dataKey
            const itemColor = itemConfig?.color || `hsl(${index * 50}, 70%, 50%)`

            return (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: itemColor,
                    }}
                  />
                  <div className="text-xs text-muted-foreground">{itemName}</div>
                </div>
                <div className="text-xs font-medium">{item.value}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
