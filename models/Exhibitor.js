const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DayExhibit = require("./DayExhibit");

const exhibitorSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    representant: {
        type: String,
        required: true
    },
    booth: {
        type:  String,
        required: true
    },
    sched: []
});

const Exhibitor = mongoose.model("Exhibitor", exhibitorSchema);

module.exports = Exhibitor;