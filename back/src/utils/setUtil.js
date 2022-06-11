const setUtil = {
    compareValues: (updateData, originData) => {
        let toUpdate = {};

        Object.entries(updateData).forEach((element) => {
            if (element[1] !== originData[element[0]])
                toUpdate[element[0]] = element[1];
        });
        return toUpdate;
    },

    shuffle: (datalist) => {
        datalist = datalist.sort(() => Math.random() - 0.5);
        return datalist;
    },
};

module.exports = setUtil;
