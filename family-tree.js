const familyTree = {
    name: "Family Tree",
    generations: [
        {
            generation: 8,
            members: [
                { name: "Johann Ulrich Maurer", birth: 1791 },
                { name: "Magdalena Andres", birth: 1796, death: 1871 },
                { name: "John Goldsworthy", birth: 1785, death: 1843 },
                { name: "Mary Battrall", birth: 1783, death: 1851 }
            ]
        },
        {
            generation: 7,
            members: [
                { name: "Carl Friederich Maurer", birth: 1824, death: 1891, parents: ["Johann Ulrich Maurer", "Magdalena Andres"] },
                { name: "Rosalie Giaque", birth: 1822, death: 1897 },
                { name: "Richard Goldsworthy", birth: 1809, death: 1864, parents: ["John Goldsworthy", "Mary Battrall"] },
                { name: "Jane Magor", birth: 1816, death: 1877 }
            ]
        },
        {
            generation: 6,
            members: [
                { name: "Fritz Anatole Maurer", birth: 1855, death: 1901, parents: ["Carl Friederich Maurer", "Rosalie Giaque"] },
                { name: "Elizabeth Lamont", birth: 1858, death: 1889 },
                { name: "Alice Annie Schwab" },
                { name: "Christopher Rodda Goldsworthy", birth: 1877, death: 1925, parents: ["Richard Goldsworthy", "Jane Magor"] },
                { name: "Clara Jane Powell", birth: 1884, death: 1968 }
            ]
        },
        {
            generation: 5,
            members: [
                { name: "Albert Jules Maurer", parents: ["Fritz Anatole Maurer", "Elizabeth Lamont"] },
                { name: "Sarah Francis Ingleton" },
                { name: "Muriel May Goldsworthy", parents: ["Christopher Rodda Goldsworthy", "Clara Jane Powell"] },
                { name: "Nancy Jean Goldsworthy" },
                { name: "Gwendoline Ronda Goldsworthy", birth: 1919, death: 1991 }
            ]
        },
        {
            generation: 4,
            members: [
                { name: "John Eric Maurer", parents: ["Albert Jules Maurer", "Sarah Francis Ingleton"] },
                { name: "Mavis Rice" },
                { name: "Sue Hatherly", parents: ["Gwendoline Ronda Goldsworthy"] },
                { name: "John Maurer" }
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
            rect.addEventListener("click", () => alert(`${member.name}: B. ${member.birth || '?'} D. ${member.death || '?'}`));
            
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
    
    container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", function() {
    renderFamilyTreeDiagram(familyTree);
});
