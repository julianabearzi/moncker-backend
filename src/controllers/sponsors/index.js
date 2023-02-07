const Sponsors = require('../../model/Sponsors');

const getAllSponsors = async (req, res) => {
  try {
    const response = await Sponsors.find();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getSponsorById = async (req, res) => {
  try {
    const response = await Sponsors.findOne({ _id: req.params.id });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No Sponsor with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const createSponsor = async (req, res) => {
  try {
    if (
      !req.body.name
      || !req.body.phone
      || !req.body.email
      || !req.body.image
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to create a Sponsor',
      });
    }
    const Sponsor = new Sponsors(req.body);
    const newSponsor = await Sponsor.save();

    return res.status(201).json(newSponsor);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const updateSponsor = async (req, res) => {
  try {
    if (
      req.body.name === ''
      || req.body.phone === ''
      || req.body.image === ''
      || req.body.email === ''
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to update Sponsor',
      });
    }
    const SponsorUpdated = await Sponsors.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!SponsorUpdated || SponsorUpdated.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No Sponsor with the id ${req.params.id}`,
      });
    }

    return res.status(201).json(SponsorUpdated);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const deleteSponsor = async (req, res) => {
  try {
    const SponsorFound = await Sponsors.findOneAndRemove({
      _id: req.params.id,
    });

    if (!SponsorFound || SponsorFound.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No Sponsor with the id ${req.params.id}`,
      });
    }

    return res.status(202).json(SponsorFound);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
};
