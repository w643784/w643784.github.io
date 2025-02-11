const familyTree = {
    name: "Family Tree",
    generations: [
        {
            generation: 8,
            members: [
                { name: "Johann Ulrich Maurer", birth: 1791, info: "Married Magdalena Andres on 10/7/1816 in La Neuveville, Berne, Switzerland." },
                { name: "Magdalena Andres", birth: 1796, death: 1871 },
                { name: "John Goldsworthy", birth: 1785, death: 1843, info: "Married Mary Battrall on 11/11/1805 in Camborne, Cornwall, England." },
                { name: "Mary Battrall", birth: 1783, death: 1851 }
            ]
        },
        {
            generation: 7,
            members: [
                { name: "Carl Friederich Maurer", birth: 1824, death: 1891, parents: ["Johann Ulrich Maurer", "Magdalena Andres"], info: "Emigrated to Australia, arriving before Rosalie, who landed in Melbourne on 24/12/1869." },
                { name: "Rosalie Giaque", birth: 1822, death: 1897 },
                { name: "Richard Goldsworthy", birth: 1809, death: 1864, parents: ["John Goldsworthy", "Mary Battrall"], info: "Married Mary McCormick in 1833, then Elizabeth in 1846, and later Jane Magor in 1847." },
                { name: "Jane Magor", birth: 1816, death: 1877 }
            ]
        }
    ]
};

function renderFamilyTreeDiagram(tree) {
    let container = document.getElementById("family-tree");
    container.innerHTML = "<h2>Family Tree</h2>";
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "500px");
    svg.style.background = "#f9f9f9";
    
    let yOffset = 50;
    let xOffset = 50;
    let nodeMap = {};
    
    tree.generations.forEach((gen, genIndex) => {
        let xPosition = xOffset;
        gen.members.forEach(member => {
            let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", xPosition);
            rect.setAttribute("y", yOffset);
            rect.setAttribute("width", "150");
            rect.setAttribute("height", "50");
            rect.setAttribute("fill", "#87CEEB");
            rect.setAttribute("stroke", "black");
            rect.setAttribute("rx", "10");
            rect.setAttribute("ry", "10");
            rect.setAttribute("cursor", "pointer");
            rect.addEventListener("click", () => alert(`${member.name}: B. ${member.birth || '?'} D. ${member.death || '?'}\n${member.info || ''}`));
            
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", xPosition + 75);
            text.setAttribute("y", yOffset + 30);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-family", "Arial, sans-serif");
            text.setAttribute("font-size", "14px");
            text.setAttribute("fill", "black");
            text.textContent = member.name;
            
            group.appendChild(rect);
            group.appendChild(text);
            svg.appendChild(group);
            
            nodeMap[member.name] = { x: xPosition + 75, y: yOffset + 50 };
            xPosition += 200;
        });
        yOffset += 100;
    });
    
    tree.generations.forEach((gen) => {
        gen.members.forEach(member => {
            if (member.parents) {
                member.parents.forEach(parentName => {
                    if (nodeMap[parentName]) {
                        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", nodeMap[parentName].x);
                        line.setAttribute("y1", nodeMap[parentName].y);
                        line.setAttribute("x2", nodeMap[member.name].x);
                        line.setAttribute("y2", nodeMap[member.name].y - 50);
                        line.setAttribute("stroke", "black");
                        line.setAttribute("stroke-width", "2");
                        line.setAttribute("marker-end", "url(#arrow)");
                        svg.appendChild(line);
                    }
                });
            }
        });
    });
    
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    let marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrow");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "5");
    marker.setAttribute("refY", "5");
    marker.setAttribute("orient", "auto");
    
    let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute("d", "M0,0 L10,5 L0,10 Z");
    arrow.setAttribute("fill", "black");
    
    marker.appendChild(arrow);
    defs.appendChild(marker);
    svg.appendChild(defs);
    
    container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", function() {
    renderFamilyTreeDiagram(familyTree);
});
