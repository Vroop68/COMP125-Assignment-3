let objects;
(function(objects){

    class paragraph {
        constructor(paragraph1 = "", paragraph2 = "", paragraph3 = "", paragraph4 ="") {
            this.paragraph1 = paragraph1;
            this.paragraph2 = paragraph2;
            this.paragraph3 = paragraph3;
            this.paragraph4 = paragraph4;
        }
    }

    objects.paragraph = paragraph;

})(objects || (objects = {}));