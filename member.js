member.js
function skillsMember() {
    var member = {
        name: "John Doe",
        age: 25,
        skills: ["html", "css", "javascript"],
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY"
        },
        fullName: function() {
            return this.name + " " + this.age;
        }
    };
    document.getElementById("member").innerHTML = member.fullName();
}
