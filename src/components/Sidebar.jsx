import { useState } from "react";
import HandlebarsRules from './HandlebarsRules.jsx'
import { ElementProperties } from "./ElementProperties.jsx";
import { Search, ChevronRight, ChevronLeft, Layout, Sparkles } from "lucide-react";
import { groupedFields, elementTypes, templatePresets, studentData } from "../templates/constants.js";

export function Sidebar({
  onDragStart,
  selectedElement,
  onUpdateElement,
  onAddElement,
  fileInputRef,
  onLoadTemplate
}) {

  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("elements");

  const filterFields = (fields) =>
    fields?.filter((f) => f?.toLowerCase()?.includes(query?.toLowerCase()));

  const handleAddElement = (type) => {
    const elementConfig = elementTypes[type];
    if (elementConfig) {
      if (type === "image") {
        fileInputRef.current?.click();
      } else {
        onAddElement(elementConfig.defaultProps);
      }
    }
  };

  if (collapsed) {
    return (
      <div className="w-12 bg-gradient-to-b from-indigo-50 to-white border-r border-indigo-100 flex flex-col items-center shadow-lg">
        <button
          className="w-full py-4 hover:bg-indigo-100 transition-all flex items-center justify-center border-b border-indigo-100"
          onClick={() => setCollapsed(false)}
          title="Expand sidebar"
        >
          <ChevronRight size={20} className="text-indigo-600" />
        </button>
        <div className="flex flex-col gap-4 mt-6">
          <div
            className="w-2 h-2 rounded-full bg-indigo-600 shadow-lg shadow-indigo-200"
            title="Fields"
          ></div>
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-300"
            title="Elements"
          ></div>
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-300"
            title="Templates"
          ></div>
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-300"
            title="Rules"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 flex flex-col h-screen shadow-xl">
      <div className="px-6 py-5 border-b border-indigo-100 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-50"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
            <Layout size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Edunext Template Builder
          </h2>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-2 hover:bg-white/20 rounded-lg transition-all relative z-10 backdrop-blur-sm"
          title="Collapse sidebar"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
      </div>

      <div className="flex bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
        {["elements", "templates", "rules"]?.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3.5 px-4 text-sm font-semibold transition-all relative ${activeTab === tab
              ? "text-indigo-600 bg-gradient-to-b from-indigo-50 to-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        {activeTab === "fields" && (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-white border-b border-gray-100 flex-shrink-0">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400"
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white shadow-sm transition-all"
                  placeholder="Search fields..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {Object.entries(groupedFields).map(([group, fields]) => {
                const filtered = filterFields(fields);
                if (!filtered.length) return null;

                return (
                  <div key={group}>
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-sm"></div>
                      {group}
                    </h3>

                    <div className="space-y-2.5">
                      {filtered.map((field) => (
                        <div
                          key={field}
                          draggable
                          onDragStart={(e) => onDragStart(e, field)}
                          className="bg-white p-4 border border-gray-200 rounded-xl cursor-grab hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all active:cursor-grabbing group relative overflow-hidden"
                        >
                          <span className="block text-sm font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors relative z-10">
                            {field}
                          </span>
                          <span className="block text-xs text-gray-500 truncate relative z-10">
                            {String(studentData[field] || "").substring(0, 35)}
                            {String(studentData[field] || "").length > 35
                              ? "..."
                              : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
        )}

        {activeTab === "elements" && (
          <div className="h-full flex flex-col">
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              <div>
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1 mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-sm"></div>
                  Layout Elements
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(elementTypes).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => handleAddElement(type)}
                      className="flex flex-col items-center gap-3 bg-white p-5 border border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <config.icon
                        size={24}
                        className="text-gray-700 group-hover:text-indigo-600 transition-colors relative z-10"
                      />
                      <span className="text-xs font-semibold text-center text-gray-700 group-hover:text-indigo-600 transition-colors relative z-10">
                        {config.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedElement && (
                <div className="border-t border-gray-200 pt-5">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1 mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full shadow-sm"></div>
                    Element Properties
                  </h3>
                  <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl p-4 border border-indigo-100 shadow-lg">
                    <ElementProperties
                      selectedElement={selectedElement}
                      onUpdateElement={onUpdateElement}
                      fileInputRef={fileInputRef}
                    />
                  </div>
                </div>
              )}
            </div>

            {!selectedElement && (
              <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-semibold mb-1">
                    No element selected
                  </p>
                  <p className="text-xs text-gray-500">
                    Click an element to customize it
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "templates" && (
          <div className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-1 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-sm"></div>
              Quick Templates
            </h3>

            <div className="space-y-3">
              {Object.entries(templatePresets).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => onLoadTemplate(template.elements)}
                  className="w-full text-left bg-white p-5 border border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                >
                  <div className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors relative z-10">
                    {template.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rules" && <HandlebarsRules />}
      </div>
    </div>
  );
}