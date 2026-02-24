const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success : false,
        message : err
    });
    next();
};

export default errorHandler;

// Column validation failed: table: Cast to ObjectId failed for value "undefined" (type string) at path "table" because of "BSONError", label: Path `label` is required., inputType: Path `inputType` is required., dataType: Path `dataType` is required., columnName: Path `columnName` is required.